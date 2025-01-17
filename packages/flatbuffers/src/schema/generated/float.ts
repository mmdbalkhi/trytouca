// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers'

export class Float {
  bb: flatbuffers.ByteBuffer | null = null
  bb_pos = 0
  __init(i: number, bb: flatbuffers.ByteBuffer): Float {
    this.bb_pos = i
    this.bb = bb
    return this
  }

  static getRootAsFloat(bb: flatbuffers.ByteBuffer, obj?: Float): Float {
    return (obj || new Float()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    )
  }

  static getSizePrefixedRootAsFloat(
    bb: flatbuffers.ByteBuffer,
    obj?: Float
  ): Float {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH)
    return (obj || new Float()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    )
  }

  value(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0
  }

  static startFloat(builder: flatbuffers.Builder) {
    builder.startObject(1)
  }

  static addValue(builder: flatbuffers.Builder, value: number) {
    builder.addFieldFloat32(0, value, 0.0)
  }

  static endFloat(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject()
    return offset
  }

  static createFloat(
    builder: flatbuffers.Builder,
    value: number
  ): flatbuffers.Offset {
    Float.startFloat(builder)
    Float.addValue(builder, value)
    return Float.endFloat(builder)
  }

  unpack(): FloatT {
    return new FloatT(this.value())
  }

  unpackTo(_o: FloatT): void {
    _o.value = this.value()
  }
}

export class FloatT {
  constructor(public value: number = 0.0) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    return Float.createFloat(builder, this.value)
  }
}
