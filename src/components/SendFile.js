import React from 'react'
import { useState } from 'react'
import { useFileContext } from '../context/FileContext';
import axios from 'axios'
import Button from '@mui/material/Button';

const SendFile = () =>  {
  const [posts, setPosts] = useState({bool:false, results:'', eval:''});
  const [error, setError] = useState({bool:false, message:'判定に失敗しました。もう一度試してみてください'});
  const [buttonName, setButtonName] = useState('判定する');
  const { fileInfo, setFile } = useFileContext();
  const data = {'file': fileInfo.base64data.replace(/data:.*\/.*;base64,/, '')}
  const buttonSend = () => {
    setButtonName('判定中...');
    setPosts({bool:false, results:'', eval:''});
    setError((error)=>({ ...error, bool:false }));
    console.log(process.env.REACT_APP_API_URL)
    axios
      .post(process.env.REACT_APP_API_URL, data, { headers: { "Content-type": "application/json" }})
      .then(response => {
        setPosts({bool:true, results:response.data.results, eval:response.data.eval});
        console.log(response.data)
        setButtonName('判定する');
      })                               //成功した場合、postsを更新する（then）
      .catch((err) => {
        console.log('通信に失敗しました');
        console.log(err)
        setButtonName('判定する');
        setError((error)=>({ ...error, bool:true }));
      });
  }
  return (
    <React.Fragment>
        <Button style={{marginTop: '20px'}} variant="contained" onClick={buttonSend}>{buttonName}</Button>
        {/* 判定結果を正しく受け取った場合のみ下記を表示する */}
        { posts.bool &&
          <div>
            <h3>判定結果：</h3>
            <div>この画像は
            {/* resultsが0の場合は「可愛い」、1の場合は「かっこいい」判定である。それぞれで表示コメントを場合分けする */}
            {posts.results == 0
                ? <span style={{fontSize: '1.3em'}}> 可愛い鳥 </span>
                : <span style={{fontSize: '1.3em'}}> かっこいい鳥 </span>
            }
            と判定されました！</div>
            <br></br>
            <div>可愛い度：{Math.round(posts.eval.kawaii*100) / 100}</div>
            <div>かっこいい度：{Math.round(posts.eval.kakkoii*100) / 100}</div>
          </div>
        }
        {/* post送信時にエラーが起こった場合のみ下記を表示する */}
        { error.bool &&
          <div style={{marginTop: '15px', color:'red'}}>{error.message}</div>
        }
    </React.Fragment>
  );
}

export default SendFile;