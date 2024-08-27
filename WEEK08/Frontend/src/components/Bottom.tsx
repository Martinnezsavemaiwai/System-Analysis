import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import './Bottom.css'
function Bottom(){
    return(
        <div className="nextorback" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <span className="ShowLeft">Showing 1 to 10 of 250 entries</span>
                        <div>
                            <LeftOutlined />
                            <button className="new-page-btn custom-btn">1</button>
                            <button className="new-page-btn custom-btn2">2</button>
                            <button className="new-page-btn custom-btn">3</button>
                            <button className="new-page-btn custom-btn">4</button>
                            <button className="new-page-btn custom-btn">5</button>
                            <button className="new-page-btn custom-btn">...</button>
                            <RightOutlined />
                        </div>
                    </div>

    )
}

export default Bottom;