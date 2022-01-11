export const _getAuth = async (req, res) => {
  return res.status(200).json({
    error: 0,
    message: 'Token is valid!',
  })
}
