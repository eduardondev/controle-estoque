import { Router, json } from 'express'
import { Logger } from '~/utils/log'
import * as login from '../controllers/Login'
import * as users from '~/controllers/Users'
import * as output from '~/controllers/Output'
import * as status from '~/controllers/Status'
import * as auth from '~/controllers/Auth'
import { isAuth } from '~/middlewares/Auth'

export const router = Router()

router.use(json())

router.use((req, res, next) => {
  Logger.info(`${req.method} ${req.url} - Host ${req.hostname}`)
  next()
})

router.get('/controle-estoque1/', (req, res) => {
  res.status(200).json({
    error: 0,
    message: 'API is running correctly.',
  })
})

/* ----- LOGIN ----- */

router.post('/controle-estoque/v1/login', login._postUserLogin)
router.post('/controle-estoque/v1/login/create', login._postCreateLogin)

/* ----- END LOGIN ----- */

/* ----- USERS ----- */

router.get('/controle-estoque/v1/users', isAuth, users._getAllUsers)
router.get('/controle-estoque/v1/user/:id', isAuth, users._getUniqueUser)
router.put(
  '/controle-estoque/v1/user/update/:id',
  isAuth,
  users._updateUniqueUser
)
router.delete(
  '/controle-estoque/v1/user/delete/:id',
  isAuth,
  users._deleteUniqueUser
)

/* ----- END USERS ----- */

/* ----- AUTH VERIFY IF TOKEN IS VALID----- */

router.get('/controle-estoque/v1/auth/', isAuth, auth._getAuth)

/* ----- END AUTH ----- */

/* ----- OUTPUT ----- */
router.get('/controle-estoque/v1/outputs', output._getAllOutputs)
router.get('/controle-estoque/v1/output/:id', output._getAllOutputs)
router.post(
  '/controle-estoque/v1/output/create',
  isAuth,
  output._postCreateOutput
)

/* ----- END OUTPUT ----- */

/* ----- STATUS ----- */

router.get('/controle-estoque/v1/status', isAuth, status._getStatus)
router.post(
  '/controle-estoque/v1/status/create',
  isAuth,
  status._postCreateStatus
)
router.delete(
  '/controle-estoque/v1/status/delete/:id',
  isAuth,
  status._deleteUniqueStatus
)

/* ----- END STATUS ----- */
