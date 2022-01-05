import { prisma } from '../data/index'
import { Logger } from '~/utils/log'

export const _getAllOutputs = async (req, res) => {
  try {
    const data = await prisma.outputs.findMany({
      where: {
        userId: req.logged.user,
      },
    })

    return res.status(200).json(data)
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
      },
    })

    if (verifyExists.length)
      return res.status(400).json({
        error: 1,
        message: 'Order with this orderId already exists.',
      })

    await prisma.outputs.create({
      data: {
        userId: req.logged.user,
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
