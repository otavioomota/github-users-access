import React, { Component } from "react";
import PropTypes from "prop-types";

import api from "../../services/api";
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  Info,
  OwnerAvatar,
  Title,
  Author,
} from "./styled";

class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("user").name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
  };

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam("user");
    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    this.setState({
      stars: page >= 2 ? [...stars, response.data] : response.data,
      page,
    });
  };

  loadMore = () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.load(nextPage);
  };

  handleNavigation = item => {
    const { navigation } = this.props;

    navigation.navigate("Webview", { item });
  };

  render() {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam("user");

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
          renderItem={({ item }) => (
            <Starred onPress={() => this.handleNavigation(item)}>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}

export default User;
