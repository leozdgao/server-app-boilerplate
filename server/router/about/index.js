import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('about/index')
})

module.exports = router
