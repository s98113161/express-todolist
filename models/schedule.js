var mongoose = require('mongoose');


// define the schema for our user model
var scheduleSchema = mongoose.Schema({
        user_account_id	: String,
		body	  		: String
	},
	{
		timestamps: true
	}
	);

/* generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
*/
// create the model for users and expose it to our app
module.exports = mongoose.model('Schedule', scheduleSchema);
