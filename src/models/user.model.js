const mongoose = require('mongoose');
const userSchema = require('./schemas/user.schema');

const User = mongoose.model('User', userSchema);

module.exports = User;



/* 
const users = [
    {
        id: 1,
        name: 'Cecilia',
        username: 'user1',
        password: '$2b$10$VBs9NdTv/WnkAh4CtRy6d.zvwGjCLM2ECNRix0UV9mOJ6CmHRKSPi',
        active: true,
        plan: 'plus'
    },
    {
        id: 2,
        name: 'Florencia',
        username: 'user2',
        password: '$2b$10$eorqS1BYQxs0MACrrXA1OOFAFJtb9yWXS6a0t4HA3l2QllKTlvG3W',
        active: false,
        plan: 'plus'
    },
    {
        id: 3,
        name: 'Lucia',
        username: 'user3',
        password: '$2b$10$aDqgdtLq4kHDP4Vi3bQL5elyRl9Eq8W25DIsvHbXNQI3CdljkfRDG',
        active: true,
        plan: 'premium'
    }
]; */
