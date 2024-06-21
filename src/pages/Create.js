import './Create.css';
import Header from '../components/Header';

const Create = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

    return(
        <>
      <div className="container">
        <Header title="일기장" />
        <div className='txtContainer'>
            <div className='txtWeather'>날짜</div>
            <div className='todayDate'>{formattedDate}</div>
            <div className='txtEmotion'>오늘의 기분</div>
            <div className='txtTag'>오늘의 해시태그</div>
            <div className='txtDiary'>오늘의 일기</div>
            <textarea className="diaryContainer" type='text'></textarea>
            <button className='registerBtn'>일기 등록</button>
        </div>
      </div>
    </>
    );
}

export default Create;
