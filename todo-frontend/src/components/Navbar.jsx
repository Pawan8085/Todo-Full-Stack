import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());

    navigate("/", { replace: true });
  }

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white shadow-md">
      <h1 className="text-2xl font-bold">
        Todo App
      </h1>

      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Space className="cursor-pointer">
          <Avatar size="large">
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>

          <span className="font-medium text-white">
            {user?.name}
          </span>

          <DownOutlined />
        </Space>
      </Dropdown>
    </nav>
  );
}

export default Navbar;