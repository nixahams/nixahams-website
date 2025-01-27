<template>
  <div class="admin-page">
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar Navigation -->
        <div class="col-md-2 sidebar">
          <h2 class="admin-title">Admin Panel</h2>
          <nav class="nav-menu">
            <router-link
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="nav-link"
              active-class="active"
            >
              <i :class="item.icon"></i>
              {{ item.title }}
            </router-link>
          </nav>
        </div>

        <!-- Main Content Area -->
        <div class="col-md-10 main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: "fas fa-chart-line",
  },
  {
    title: "Repeaters",
    path: "/admin/repeaters",
    icon: "fas fa-tower-cell",
  },
  {
    title: "Announcements",
    path: "/admin/announcements",
    icon: "fas fa-bullhorn",
  },
  {
    title: "Meetings",
    path: "/admin/meetings",
    icon: "fas fa-users",
  },
  {
    title: "Members",
    path: "/admin/members",
    icon: "fas fa-user-group",
  },
  {
    title: "Officers",
    path: "/admin/officers",
    icon: "fas fa-user-tie",
  },
  {
    title: "Nets",
    path: "/admin/nets",
    icon: "fas fa-broadcast-tower",
  },
];
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background-color: rgb(17, 17, 17);
  color: rgb(208, 213, 239);
}

.sidebar {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 2rem 1rem;
  min-height: calc(100vh - 60px); /* Adjust based on your navbar height */
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-title {
  color: #f59e0b;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: rgb(208, 213, 239);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.nav-link.active {
  background-color: #f59e0b;
  color: white;
}

.nav-link i {
  width: 20px;
  text-align: center;
}

.main-content {
  padding: 2rem;
}

@media (max-width: 768px) {
  .sidebar {
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-menu {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .nav-link {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }
}
</style>
