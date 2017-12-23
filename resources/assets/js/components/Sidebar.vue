<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
              <li class="nav-item">
                  <router-link :to="'/words'" class="nav-link" exact><i class="icon-pie-chart"></i> Words</router-link>
              </li>
              <li class="nav-item">
                  <router-link :to="'/categories'" class="nav-link" exact><i class="icon-pie-chart"></i> Categories</router-link>
              </li>
            </ul>
        </nav>
    </div>
</template>
<script>

export default {
    name: 'sidebar',
    methods: {
        handleClick (e) {
            e.preventDefault()
            e.target.parentElement.classList.toggle('open')
        }
    }
}
</script>

<style lang="css">
    .nav-link {
        cursor:pointer;
    }
</style>
