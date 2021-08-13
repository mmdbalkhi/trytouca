// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { touca } from '../../src/index';
import { is_prime } from './code_under_test';

touca.workflow('is_prime_test', (testcase: string) => {
  const number = Number.parseInt(testcase);
  touca.add_result('is_prime_output', is_prime(number));
});

touca.run();
