import {service} from './service';
import {InterviewInfo} from './models';

function InitInterview(){
    function handleStart(e){
        e.target.disabled = true;
        console.log('Start');
        service.CreateInterview(new InterviewInfo({
            job: 'Developer',
            position: 'Frontend',
            language: 'en',
            level: 'junior',
            duration: 10,
            model: 'default'
        }))
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
    }
    return (
        <div>
            <h1>Interview</h1>
            <button onClick={handleStart}>Start</button>
        </div>
    )
}

export default InitInterview;