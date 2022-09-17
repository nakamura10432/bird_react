import { FileProvider } from '../context/FileContext';
import SelectFile from '../components/SelectFile'
import SendFile from '../components/SendFile'

const TopPage = () => {
    return (
        <div style={{margin: '20px'}}>
            <h2>可愛い鳥とかっこいい鳥を識別するAI</h2>
            <FileProvider>
                <SelectFile/>
                <SendFile/>
            </FileProvider>
        </div>
    );
}
export default TopPage;