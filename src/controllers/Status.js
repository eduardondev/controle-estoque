import { prisma } from '../data/index'
import { Logger } from '~/utils/log'

export const _getStatus = async (req, res) => {
  try {
    const status = await prisma.status.findMany()

    return res.status(200).json({
      error: 0,
      status,
    })
  } catch (err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: 'Something is wrong. Please, contact us!',
    })
  }
}

export const _postCreateStatus = async (req, res) => {
  try {
    let { name, code } = req.body

    if (!code || !name)
      return res.status(400).json({
        error: 1,
        message: 'Please, verify the sended fields.',
      })

    const verifyExists = await prisma.status.findMany({
      where: {
        code,
      },
    })

    if (verifyExists.length)
      return res.status(400).json({
        error: 1,
        message: 'Status with this code or name already exists.',
      })

    await prisma.status.create({
      data: {
        code,
        name,
      },
    })

    return res.status(200).json({
      error: 0,
      message: 'Status created successfully!',
    })
  } catch (err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: 'Something is wrong. Please, contact us!',
    })
  }
}

export const _deleteUniqueStatus = async (req, res) => {
  try {
    let id = req.params.id

    if (!id)
      return res.status(404).json({
        error: 1,
        message: 'Missing id!',
      })

    const verifyExists = await prisma.status.findUnique({
      where: {
        id,
      },
    })

    if (!verifyExists)
      return res.status(404).json({
        error: 1,
        message: 'Code not found',
      })

    const deleteStatus = await prisma.status.delete({
      where: {
        id,
      },
    })

    return res.status(200).json({
      error: 0,
      deletedStatus: deleteStatus.id,
    })
  } catch (err) {
    console.log(err)
  }
}
