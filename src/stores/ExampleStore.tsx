// import { observable, action } from 'mobx'

// export class ExampleStore {
//   constructor(rootStore) {
//     this.rootStore = rootStore
//   }

//   @observable
//   test: number = 0

//   @action
//   testFunc = () => {
//     this.test += 1
//   }
// }

// const Home = ({ exampleStore, navigation }) => {
//   return (
//     <HomeContext.Provider value={{ navigation }}>
//       <Containers>
//         <Content>
//           <Text>Hello! Mr. Kong</Text>
//           <Text>What would you like to eat today</Text>
//           <Text>{exampleStore.test || '555'}</Text>
//           <Button rounded success onPress={() => exampleStore.testFunc()}>
//             <Text>Press Me</Text>
//           </Button>
//           <RestaurantCard />
//         </Content>
//       </Containers>
//     </HomeContext.Provider>
//   )
// }

// Home.propTypes = {
//   exampleStore: PropTypes.object,
//   navigation: PropTypes.object,
// }

// export default compose(
//   withSafeView,
//   inject(({ rootStore }) => ({
//     exampleStore: rootStore.exampleStore,
//   })),
//   observer,
// )(Home)
