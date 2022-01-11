import { Logger } from '~/utils/log'
import { prisma } from '../data/index'
import { encrypt, verify } from '../utils/bcrypt'
import { generateToken } from '~/middlewares/Auth'

export const _postUserLogin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({
      error: 1,
      message: 'Missing data',
    })

  const verifyLogin = await prisma.users.findUnique({
    where: {
      email,
    },
  })

  if (!verifyLogin)
    return res.status(404).json({
      error: 1,
      message: 'User not found.',
    })

  const verifyPass = verify(password, verifyLogin.password)

  if (!verifyPass)
    return res.status(401).json({
      error: 1,
      message: 'Incorrect password.',
    })

  generateToken(req, res, verifyLogin.id)
}

export const _postCreateLogin = async (req, res) => {
  try {
    let { email, name, password, permission } = req.body

    if (!email || !name || !password)
      return res.status(400).json({
        error: 1,
        message: 'Please, verify the sended fields.',
      })

    const verifyExists = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    if (verifyExists)
      return res.status(400).json({
        error: 1,
        message: 'User with this e-mail already exists.',
      })

    permission = parseInt(permission)
    const encryptedPass = encrypt(password)

    await prisma.users.create({
      data: {
        email,
        name,
        password: encryptedPass,
        permissionCode: permission || 0,
      },
    })

    return res.status(200).json({
      error: 0,
      message: 'User created successfully!',
    })
  } catch (err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: 'Something is wrong. Please, contact us!',
    })
  }
}
