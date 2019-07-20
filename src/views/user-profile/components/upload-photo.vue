<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input', $event)"
      :show-confirm-button="false"
    >
      <van-cell-group>
        <van-cell title="从相册选择" @click="handleShowFileSelect" />
        <input style="display: none;" ref="file" type="file">
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  methods: {
    handleShowFileSelect () {
      this.file.click()
    }
  }
}
</script>

<style>

</style>
