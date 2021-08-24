// module.exports = {
//     project: {
//       ios: {},
//       android: {}, // grouped into "project"
//     },
// };
module.exports = {
  dependencies: {
    '@react-native-community/netinfo': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
  },
  assets: ["./assets/fonts/"], // stays the same
};