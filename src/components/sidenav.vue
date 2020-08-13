<template>
  <div class="sidenav" style="z-index: 999;">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-menu-item index="1">
        <a href="#intro"><i class="el-icon-user-solid"></i></a>
        <span slot="title">Basic</span>
      </el-menu-item>
      <el-menu-item index="2">
        <a href="#edu"><i class="el-icon-s-management"></i></a>
        <span slot="title">Education</span>
      </el-menu-item>
      <el-menu-item index="3">
        <a href="#exp"><i class="el-icon-s-cooperation"></i></a>
        <span slot="title">Experiences</span>
      </el-menu-item>
      <el-menu-item index="4">
        <a href="#proj"><i class="el-icon-s-open"></i></a>
        <span slot="title">Projects</span>
      </el-menu-item>
      <el-menu-item index="5">
        <a href="#skill"><i class="el-icon-s-opportunity"></i></a>
        <span slot="title">Skills</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  }
};
</script>

<style scoped>
.sidenav {
  opacity: 0.2;
  position: fixed;
  height: 300px;
  right: 1rem;
  top: 25%;
  bottom: 25%;
  transition: opacity 1s;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.sidenav:hover {
  opacity: 0.7;
}
</style>
