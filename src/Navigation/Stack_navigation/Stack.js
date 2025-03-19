import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import Splash from "../../Screens/Auth/Splash.js"
import Login from "../../Screens/Auth/Login.js"
import Otp from "../../Screens/Auth/Otp.js"
import Bottom_tab_navigation from "../Bottom_tab_navigation/Bottom_tab.js"
import ViewAll from "../../Screens/view_all/ViewAll.display.js"
import Blog from "../../Screens/display/Blog.screen.js"
import Booking from "../../Screens/display/Booking.screen.js"
import Search from "../../Screens/Header_nav_screens/Search.js"
import Trips from "../../Screens/Header_nav_screens/Trips.js"
import Favourite from "../../Screens/Header_nav_screens/Favourite.js"
import Profile from "../../Screens/Header_nav_screens/Profile.js"
import Settings from "../../Screens/Settings.js"
import Transports from "../../Screens/Transports.js"
import About from "../../Screens/About.js"
import Contacts from "../../Screens/Contacts.js"
import Language from "../../Screens/Auth/Language.js"
import Itenary from "../../Screens/Trips/Itenary.trips.js"
import Itenary_display from "../../Screens/display/itenary.screen.js"


const stack = createNativeStackNavigator()


const Stack_navigation = () => {


  return (
    <NavigationContainer>

      <stack.Navigator
        // backBehavior=
        history={false}
        initialRouteName='splash'
      >
        <stack.Screen options={{ headerShown: false, }} name='splash' component={Splash} />

        <stack.Screen options={{ headerShown: false, }} name='login' component={Login} />
        <stack.Screen options={{ headerShown: false, }} name='otp' component={Otp} />
        <stack.Screen options={{ headerShown: false, }} name='language' component={Language} />

        <stack.Screen options={{ headerShown: false, }} name='tab' component={Bottom_tab_navigation} />

        <stack.Screen options={{ headerShown: false, }} name='viewall' component={ViewAll} />
        <stack.Screen options={{ headerShown: false, }} name='blog' component={Blog} />

        <stack.Screen options={{ headerShown: false, }} name='booking' component={Booking} />

        <stack.Screen options={{ headerShown: false, }} name='search' component={Search} />
        <stack.Screen options={{ headerShown: false, }} name='trips' component={Trips} />
        <stack.Screen options={{ headerShown: false, }} name='itenary_display' component={Itenary_display} />
        <stack.Screen options={{ headerShown: false, }} name='favourite' component={Favourite} />
        <stack.Screen options={{ headerShown: false, }} name='profile' component={Profile} />
        <stack.Screen options={{ headerShown: false, }} name='itenary' component={Itenary} />
        
        <stack.Screen options={{ headerShown: false, }} name='settings' component={Settings} />
        <stack.Screen options={{ headerShown: false, }} name='contacts' component={Contacts} />
        <stack.Screen options={{ headerShown: false, }} name='transport' component={Transports} />
        <stack.Screen options={{ headerShown: false, }} name='about' component={About} />

      </stack.Navigator>

    </NavigationContainer>


  )
}





export default Stack_navigation;