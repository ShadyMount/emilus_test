import React, { Component } from "react";
import { Card, Table, Tooltip, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { connect } from "react-redux";
import { requstClients, setSelectedClient } from "redux/actions/Clients";
import _ from "lodash";

export class UserList extends Component {
  componentDidMount() {
    this.props.requstClients();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     !_.isEqual(this.props.clientsList.length, prevProps.clientsList.length)
  //   ) {
  //     this.setState({
  //       users: this.props.clientsList,
  //       isClientsLoading: this.props.loading,
  //     });
  //   }
  // }

  // showUserProfile = (userInfo) => {
  //   this.setState({
  //     userProfileVisible: true,
  //     selectedUser: userInfo,
  //   });
  // };

  render() {
    const { clientsList, selectedClient, setSelectedClient, loading } =
      this.props;

    const tableColumns = [
      {
        title: "User",
        dataIndex: "name",
        render: (_, record) => (
          <div className="d-flex">
            <AvatarStatus
              src={record.img}
              name={record.name}
              subTitle={record.email}
            />
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Username",
        dataIndex: "username",
        sorter: {
          compare: (a, b) => {
            a = a.username.toLowerCase();
            b = b.username.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Website",
        dataIndex: "website",
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className="text-right">
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];

    return (
      <Card bodyStyle={{ padding: "0px" }}>
        <Table
          columns={tableColumns}
          loading={loading}
          dataSource={clientsList}
          rowKey="id"
        />
      </Card>
    );
  }
}

// export default UserList;

const mapStateToProps = ({ clients }) => {
  const { clientsList, loading, selectedUser } = clients;
  return { clientsList, loading, selectedUser };
};

const mapDispatchToProps = {
  requstClients,
  setSelectedClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
