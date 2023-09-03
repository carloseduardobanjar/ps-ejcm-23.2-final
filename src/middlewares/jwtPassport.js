const fs = require('fs');
const path = require('path');
const Usuario = require('../models/Usuario');
const pathToKey = path.join(__dirname, '../../', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


//configuracoes do passport?
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer <token>
	secretOrKey: PUB_KEY,
	algorithms: ['RS256'] // RSA
}

module.exports = (passport) => {
	passport.use(new JwtStrategy(options, async (payload, done) => {
		await Usuario.findByPk(payload.sub).then((user) => {
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		}).catch(err => {done(err, null); console.log("caiu no erro")});
	}));
};