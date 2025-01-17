# Copyright 2022 Touca, Inc. Subject to Apache-2.0 License.

import logging
from argparse import ArgumentParser
from pathlib import Path
from typing import List
import sys
import touca
from touca.cli._common import Operation
from touca._runner import run_workflows, _parse_cli_options, _Workflow

logger = logging.getLogger("touca.cli.check")


class Check(Operation):
    name = "check"
    help = "Submit the test output generated by other applications to the Touca Server"

    @classmethod
    def parser(self, parser: ArgumentParser):
        parser.add_argument(
            "--suite",
            help="name of the suite to associate with this output",
            required=True,
        )
        parser.add_argument(
            "--testcase",
            help="name of the testcase to associate with this output",
            required=False,
        )
        if sys.stdin.isatty():
            parser.add_argument(
                "src",
                help="path to file or directory to submit",
            )

    def __init__(self, options: dict):
        self.__options = options

    def _slugify(self, file: Path):
        return (
            str(file.absolute().relative_to(Path.cwd()))
            .replace(".", "_")
            .replace("/", "_")
            .replace("-", "_")
        )

    def _submit_stdin(self):
        def _submit(testcase: str):
            touca.check("output", sys.stdin.read())

        workflow = _Workflow(_submit, self.__options.get("suite"))
        testcase = self.__options.get("testcase")
        workflow.testcases = [testcase] if testcase else ["stdout"]
        run_workflows(_parse_cli_options([]), [workflow])
        return True

    def _submit_file(self, file: Path):
        content = file.read_text()

        def _submit(testcase: str):
            touca.check("output", content)

        testcase = self.__options.get("testcase")
        workflow = _Workflow(_submit, self.__options.get("suite"))
        workflow.testcases = [testcase] if testcase else [self._slugify(file)]
        run_workflows(_parse_cli_options([]), [workflow])
        return True

    def _get_file_content(self, file: Path):
        try:
            return file.read_text()
        except:
            from hashlib import sha256

            return sha256(file.read_bytes()).hexdigest()

    def _submit_directory(self, directory: Path):
        files = {
            self._slugify(file): file for file in directory.glob("*") if file.is_file()
        }

        def _submit(testcase: str):
            if not self.__options.get("testcase"):
                content = self._get_file_content(files.get(testcase))
                touca.check("output", content)
                return
            for slug, file in files.items():
                touca.check(slug, self._get_file_content(file))

        testcase = self.__options.get("testcase")
        workflow = _Workflow(_submit, self.__options.get("suite"))
        workflow.testcases = [testcase] if testcase else files.keys()
        run_workflows(_parse_cli_options([]), [workflow])
        return False

    def run(self) -> bool:
        if not sys.stdin.isatty():
            return self._submit_stdin()
        src = Path(self.__options.get("src"))
        if src.is_file():
            return self._submit_file(src)
        if src.is_dir():
            return self._submit_directory(src)
        logger.error("specified path is neither a directory nor a file")
        return False
