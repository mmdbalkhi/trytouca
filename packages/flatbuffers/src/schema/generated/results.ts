// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers'

import { Result, ResultT } from './result'

export class Results {
  bb: flatbuffers.ByteBuffer | null = null
  bb_pos = 0
  __init(i: number, bb: flatbuffers.ByteBuffer): Results {
    this.bb_pos = i
    this.bb = bb
    return this
  }

  static getRootAsResults(bb: flatbuffers.ByteBuffer, obj?: Results): Results {
    return (obj || new Results()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    )
  }

  static getSizePrefixedRootAsResults(
    bb: flatbuffers.ByteBuffer,
    obj?: Results
  ): Results {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH)
    return (obj || new Results()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    )
  }

  entries(index: number, obj?: Result): Result | null {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset
      ? (obj || new Result()).__init(
          this.bb!.__indirect(
            this.bb!.__vector(this.bb_pos + offset) + index * 4
          ),
          this.bb!
        )
      : null
  }

  entriesLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0
  }

  static startResults(builder: flatbuffers.Builder) {
    builder.startObject(1)
  }

  static addEntries(
    builder: flatbuffers.Builder,
    entriesOffset: flatbuffers.Offset
  ) {
    builder.addFieldOffset(0, entriesOffset, 0)
  }

  static createEntriesVector(
    builder: flatbuffers.Builder,
    data: flatbuffers.Offset[]
  ): flatbuffers.Offset {
    builder.startVector(4, data.length, 4)
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]!)
    }
    return builder.endVector()
  }

  static startEntriesVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4)
  }

  static endResults(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject()
    return offset
  }

  static createResults(
    builder: flatbuffers.Builder,
    entriesOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    Results.startResults(builder)
    Results.addEntries(builder, entriesOffset)
    return Results.endResults(builder)
  }

  unpack(): ResultsT {
    return new ResultsT(
      this.bb!.createObjList(this.entries.bind(this), this.entriesLength())
    )
  }

  unpackTo(_o: ResultsT): void {
    _o.entries = this.bb!.createObjList(
      this.entries.bind(this),
      this.entriesLength()
    )
  }
}

export class ResultsT {
  constructor(public entries: ResultT[] = []) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    const entries = Results.createEntriesVector(
      builder,
      builder.createObjectOffsetList(this.entries)
    )

    return Results.createResults(builder, entries)
  }
}
