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

router.get('/v1/', (req, res) => {
  res.status(200).json({
    error: 0,
    message: 'API is running correctly.',
  })
})

/* ----- LOGIN ----- */

router.post('/v1/login', login._postUserLogin)
router.post('/v1/login/create', login._postCreateLogin)

/* ----- END LOGIN ----- */

/* ----- USERS ----- */

router.get('/v1/users', isAuth, users._getAllUsers)
router.get('/v1/user/:id', isAuth, users._getUniqueUser)
router.put('/v1/user/update/:id', isAuth, users._updateUniqueUser)
router.delete('/v1/user/delete/:id', isAuth, users._deleteUniqueUser)

/* ----- END USERS ----- */

/* ----- AUTH VERIFY IF TOKEN IS VALID----- */

router.get('/v1/auth/', isAuth, auth._getAuth)

/* ----- END AUTH ----- */

/* ----- OUTPUT ----- */
router.get('/v1/outputs', output._getAllOutputs)
router.get('/v1/output/:id', output._getAllOutputs)
router.post('/v1/output/create', isAuth, output._postCreateOutput)

/* ----- END OUTPUT ----- */

/* ----- STATUS ----- */

router.get('/v1/status', isAuth, status._getStatus)
router.post('/v1/status/create', isAuth, status._postCreateStatus)
router.delete('/v1/status/delete/:id', isAuth, status._deleteUniqueStatus)

/* ----- END STATUS ----- */
