import { useFileContext } from '../context/FileContext';
import Button from '@mui/material/Button';

const SelectFile = () => {
    //const [状態変数, 状態を変更するための関数] = useState(状態の初期値);
    const { fileInfo, setFile } = useFileContext();
    const onFileInputChange = (event) => {
        setFile((fileInfo)=>({ ...fileInfo, object: event.target.files[0] }));
        //console.log(fileInfo);
        const reader = new FileReader()
        // ファイルを読み込み終わったタイミングで実行するイベントハンドラー
        reader.onload = (e) => {
            //読み込み結果（データURL）を代入する
            setFile((fileInfo)=>({ ...fileInfo, base64data: e.target.result }));
        }
        // ファイルを読み込む
        // 読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
        reader.readAsDataURL(event.target.files[0])
	};
    console.log(fileInfo);
    return (
        <div>
            <div style={{marginBottom: '10px'}}>画像を選択してください</div>
            <Button variant="contained" component="label">
                ファイルを選択
                <input type='file' hidden accept="image/*" onChange={onFileInputChange}/>
            </Button>
            <div style={{margin: '5px'}}>{fileInfo && fileInfo.object.name}</div>
            <img width="200" src={fileInfo.base64data}/>
        </div>
    );
};

export default SelectFile;