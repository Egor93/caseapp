import { Layout } from 'antd';
import {InputForm} from "./InputForm";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    minHeight: '5vh',
    paddingInline: 10,
    lineHeight: '4px',
    backgroundColor: '#6ebad3',
};

const contentStyle = {
    textAlign: 'center',
    minHeight: '80vh',
    lineHeight: '30px',
    color: '#fff',
    backgroundColor: 'lightgray',
};

const siderStyle= {
    textAlign: 'center',
    minHeight: "100%",
    color: '#fff',
    backgroundColor: '#3ba0e9',
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    minHeight: '5%',
    backgroundColor: '#7dbcea',
};

export const MainComponent= () => {
    return (
        <>
            <Layout style={{minHeight:"100vh"}}>
                <Sider style={siderStyle}>Sider</Sider>
                <Layout>
                    <Header style={headerStyle}>
                        <div><p style={{color:'#7a1278',fontSize:'30px'}}>Mock Page</p></div>
                    </Header>
                    <Content style={contentStyle}>
                        <InputForm/>
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </>
    )
}