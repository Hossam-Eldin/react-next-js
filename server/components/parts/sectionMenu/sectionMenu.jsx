import React from 'react';
import { Menu, Icon } from 'antd';
import Link from 'next/link';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sider extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Sections</span></span>}>
          {
            this.props.sections.map(section => {
              return (<Menu.Item key={section.id}>
                <Link href={`/section/?title=${section.name}`} as={`/o/${section.name}`}>
                  {section.name}
                </Link>
              </Menu.Item>
              )
            })
          }
        </SubMenu>

        {/*   <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
    );
  }
}

export default Sider;