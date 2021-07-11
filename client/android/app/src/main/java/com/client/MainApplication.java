package com.client;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.arthenica.reactnative.RNFFmpegPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
// import com.ammarahmed.rnadmob.nativeads.RNAdmobNativePackage;
// import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.brentvatne.react.ReactVideoPackage;
// import com.RNFetchBlob.RNFetchBlobPackage; 
// import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
// import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import com.twiliorn.library.TwilioPackage;
// import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new LinearGradientPackage());
          packages.add(new LottiePackage());
          // packages.add(new ReactNativeConfigPackage());
          // packages.add(new RNFirebasePackage());
          packages.add(new ReactVideoPackage());
          // packages.add(new RNFirebaseStoragePackage());
          // packages.add(new RNFetchBlobPackage());
          // packages.add(new RNFileViewerPackage());
          packages.add(new TwilioPackage());
          // packages.add(new ReactNativeFirebaseMessagingPackage());
          // packages.add(new RNAdmobNativePackage());
          // packages.add(new ReactNativeFirebaseMessagingPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.client.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
