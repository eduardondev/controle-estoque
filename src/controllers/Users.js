import { Logger } from '~/utils/log'
import { prisma } from '../data/index'

export const _getAllUsers = async (req, res) => {
  try {
    const data = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
        permissionCode: true,
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

export const _getUniqueUser = async (req, res) => {
  try {
    let id = req.params.id

    if (!id)
      return res.status(404).json({
        error: 1,
        message: 'Missing id!',
      })

    const verifyUser = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
        permissionCode: true,
      },
    })

    if (!verifyUser)
      return res.status(404).json({
        error: 1,
        message: 'User not found.',
      })

    return res.status(200).json(verifyUser)
  } catch (err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: 'Something is wrong. Please, contact us!',
    })
  }
}

export const _updateUniqueUser = async (req, res) => {
  let id = req.params.id
  let { email, name, active, permission } = req.body

  if (!id)
    return res.status(404).json({
      error: 1,
      message: 'Missing id!',
    })

  if (!email || !name || !active || !permission)
    return res.status(404).json({
      error: 1,
      message: 'Missing data!',
    })

  const verifyUser = await prisma.users.findUnique({
    where: {
      id,
    },
  })

  if (!verifyUser)
    return res.status(404).json({
      error: 1,
      message: 'User not found.',
    })

  return res.status(200).json(verifyUser)
}

export const _deleteUniqueUser = async (req, res) => {
  try {
    let id = req.params.id

    if (!id)
      return res.status(404).json({
        error: 1,
        message: 'Missing id!',
      })

    const verifyExists = await prisma.users.findUnique({
      where: {
        id,
      },
    })

    if (!verifyExists)
      return res.status(404).json({
        error: 1,
        message: 'User not found',
      })

    const deleteUser = await prisma.users.delete({
      where: {
        id,
      },
    })

    return res.status(200).json({
      error: 0,
      deletedUser: deleteUser.id,
    })
  } catch (err) {
    console.log(err)
  }
}
