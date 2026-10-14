plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.omnexia.olcrusty"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.omnexia.olcrusty"
        minSdk = 23
        targetSdk = 28
        versionCode = 1
        versionName = "1.0"
    }

    dependencies {
        implementation("androidx.webkit:webkit:1.13.0")
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}
