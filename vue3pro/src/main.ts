import { createApp } from 'vue'

import App from './App.vue'

// 1.全家的css
import './styles/index.scss'

const app = createApp(App)   // 创建一个应用实例。 


// 2. 全局路由挂载
import router from './router/index'
app.use(router)


// 3. 全局组件注册 
import Demo from '@/components/Demo.vue'
app.component('Demo',Demo)
import MyTitle from '@/components/MyTitle.vue'
app.component('MyTitle',MyTitle)
import FormData from '@/components/FormData.vue'
app.component('FormData',FormData)

// 4. 注册使用 antdv
import Antd from 'ant-design-vue'; 
import 'ant-design-vue/dist/antd.css';

app.use(Antd) 

// 5. element-plus  

// 6. pinia使用
// 创建一个 pinia（根存储）并将其传递给应用程序：
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// app.use(createPinia().use(piniaPluginPersistedstate))   // pinia 持久化 
app.use(createPinia())    


app.mount('#app')




