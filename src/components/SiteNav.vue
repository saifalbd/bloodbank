<template>
<header>
    <section>
        <div class="col1">
            <router-link to="/">
                <h3>Blood Bank</h3>
            </router-link>
            <ul class="inline">
                <li>
                    <router-link :to="{name:'Dashboard'}">Dashboard</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Member'}">Members</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Settings'}">Settings</router-link>
                </li>
                <li><a @click="logout()">logout</a></li>
            </ul>
        </div>
    </section>
</header>
</template>

<script>
import { auth } from '@/firebase'
import { LocalAuth } from '@/plugins/LocalAuth'
export default {
    methods: {
      async  logout() {
      //   await auth.signOut()
          await LocalAuth.logOut();
       
        }
    }
}
</script>
