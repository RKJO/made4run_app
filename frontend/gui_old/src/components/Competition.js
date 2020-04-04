import React from 'react';
import { List, Avatar, Icon, Button } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const Competitions = (props) => {
    return (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={props.data}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                  <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                  <IconText type="message" text="2" key="list-vertical-message" />,
                ]}
                extra={
                  <a href={`/${item.url}`}>
                    <Button type="primary" shape="round" size='small'>{item.text}</Button>
                  </a>
                }
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.avatar} />}
                  title={<a href={`competitions/${item.slug}`}>{item.name}</a>}
                  description={item.description}
                />
                {item.distances}
                
              </List.Item>
            )}
          />
        );
}

export default Competitions;