
import React, {useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Header,Foot, SubHeader} from '../../atoms';
import { Art, Bid, LiveChat} from '../../molecules';
const { Content } = Layout;
const { Footer } = Layout;

const ParentWrapper = (props) => {
    return (
       <Layout style={{ height: '100%' }} id='auction'>
            <Header/>
            <SubHeader/>
            <Content>
                <Art/>
            </Content>
            <Footer
					style={{
						position: 'fixed',
						bottom: '0',
						zIndex: '2',
					}}
				>
					<Foot/>
			</Footer>       
        </Layout>
    )
}
export default ParentWrapper;
