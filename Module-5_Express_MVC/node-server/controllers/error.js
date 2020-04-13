module.exports = function resourceNotFound(req, resp, next){
  resp.status(404).render('404', { pageTitle: '404' });
};