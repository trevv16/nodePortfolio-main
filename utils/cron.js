var CronJob = require('cron').CronJob;


module.exports = {
    emailActiveUsers: () => {
        var job = new CronJob('* * * * * *', function() {
        console.log('You will see this message every second');
       }, null, true, 'America/Los_Angeles');
        job.start();
   },
    job2: () => {
        
   },
    job3: () => {
        
   }
};