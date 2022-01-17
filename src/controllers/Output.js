import { prisma } from '../data/index'
import { Logger } from '~/utils/log'
import { DecodeJWT } from '~/utils/decodeJwt'

export const _getAllOutputs = async (req, res) => {
  try {
    const { limit } = req.query

    const { user: jwtUserId } = await DecodeJWT(req.headers.authorization)

    const outputs = await prisma.outputs.findMany({
      where: {
        userId: jwtUserId,
      },
      take: parseInt(limit) || 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
    const status = await prisma.status.findMany({
      select: {
        code: true,
        name: true,
      },
    })

    return res.status(200).json({
      outputs: outputs,
      status: status,
    })
  } catch (err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: 'Something is wrong. Please, contact us!',
    })
  }
}

export const _getUniqueOutput = async (req, res) => {
  try {
    const { id } = req.params

    if (!id)
      return res.status(404).json({
        error: 1,
        message: 'Missing id!',
      })

    const output = await prisma.outputs.findUnique({
      where: {
        id,
      },
    })

    if (!output)
      return res.status(404).json({
        error: 1,
        message: 'Output not found.',
      })

    return res.status(200).json(output)
  } catch (err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: 'Something is wrong. Please, contact us!',
    })
  }
}

export const _postCreateOutput = async (req, res) => {
  try {
    let { orderId, date, status, employee, shipping, sku, tracker, quantity } =
      req.body

    const { user: jwtUserId } = await DecodeJWT(req.headers.authorization)

    if (
      !orderId ||
      !status ||
      !employee ||
      !shipping ||
      !sku ||
      !tracker ||
      !date ||
      !quantity
    )
      return res.status(400).json({
        error: 1,
        message: 'Please, verify the sended fields.',
      })

    const verifyExists = await prisma.outputs.findMany({
      where: {
        orderId,
        userId: jwtUserId,
      },
    })

    if (verifyExists.length)
      return res.status(400).json({
        error: 1,
        message: 'Order with this orderId already exists.',
      })

    await prisma.outputs.create({
      data: {
        userId: jwtUserId,
        orderId,
        date: new Date(date),
        shipping,
        status: parseInt(status),
        quantity: parseInt(quantity),
        employee,
        sku,
        tracker,
      },
    })

    return res.status(200).json({
      error: 0,
      message: 'Output created successfully!',
    })
  } catch (err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: 'Something is wrong. Please, contact us!',
    })
  }
}
