import User from '../../../db/models/user';

export const register = async ctx => {
  ctx.body = '123123';

  const { username, password } = ctx.request.body;

  try {
    const doesUserExist = await User.findByUsername(username);
    if (doesUserExist) {
      ctx.status = 409;
      ctx.body = {
        message: 'user already exists',
      };
      return;
    }

    const newUser = new User({ username });

    await newUser.setPassword(password);
    await newUser.save();

    const token = await newUser.generateToken();
    ctx.cookies.get('login_access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });

    const serializedData = await newUser.serializeToJSON();

    ctx.body = serializedData;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async ctx => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        message: `oopssss.. something's went wrong`,
      };
      return;
    }

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      ctx.status = 401;
      ctx.body = {
        message: `oopssss.. something's went wrong`,
      };
      return;
    }

    const token = await user.generateToken();
    ctx.cookies.set('login_access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });

    ctx.body = {
      message: 'login succeed!',
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const isValidUser = ctx => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    ctx.body = {
      message: 'not authorized',
    };
    return;
  }
  ctx.body = user;
};

export const logout = ctx => {
  ctx.cookies.set('login_access_token');
  ctx.status = 204;
  return;
};
