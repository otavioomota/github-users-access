import React, { Component } from "react";
// import { View } from "react-native";
import { Keyboard, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "./styles";

import api from "../../services/api";

class Main extends Component {
  static navigationOptions = {
    title: "Usuarios",
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    users: [],
    newUser: "",
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem("users");

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem("users", JSON.stringify(users));
    }
  }

  handleAddUSer = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: "",
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleNavigation = user => {
    const { navigation } = this.props;

    navigation.navigate("User", { user });
  };

  render() {
    const { newUser, users, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorret={false}
            autoCapitalize="none"
            placeholder="Adicione um usuario"
            onChangeText={text => this.setState({ newUser: text })}
            value={newUser}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUSer}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUSer}>
            {loading ? (
              <ActivityIndicator color="#eee" />
            ) : (
              <Icon name="add" size={20} color="#eee" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigation(item)}>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

export default Main;
