import { Logger } from '~/utils/log'
import { prisma } from '../data/index'
import { encrypt, verify } from '../utils/bcrypt'

const decodeBasicToken = basicToken => {
  console.log('aqui ', basicToken)

  const [type, credentials] = basicToken.split(' ')

  if (type !== 'Basic') throw new Error('Invalid token type')

  return Buffer.from(credentials, 'base64').toString().split(':')
}

export const _getUserLogin = async (req, res) => {
  const [email, password] = decodeBasicToken(req.headers.authorization)

  if (!email || !password)
    return res.status(400).json({
      error: 1,
      message: 'Missing data',
    })

  const verifyLogin = await prisma.users.findUnique({
    where: {
      email: email,
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

  console.log(verifyLogin.id)

  return res.redirect(`/v1/auth/${verifyLogin.id}`)
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
        email: email,
      },
    })

    if (verifyExists)
      return res.status(400).json({
        error: 1,
        message: 'User with this e-mail already exists.',
      })

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
