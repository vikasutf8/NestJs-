export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'this is hard code secret',
};
console.log(process.env.JWT_SECRET, 'jwt Secret');
