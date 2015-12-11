import exphbs from 'express-handlebars'
import fp from 'path'
import env from '../../config/environment'

module.exports = exphbs.create({
  extname: '.hbs',
  layoutsDir: fp.join(env.entriesDirectory, '_layouts'),
  partialsDir: fp.join(env.entriesDirectory, '_partials'),
  defaultLayout: 'main'
})
