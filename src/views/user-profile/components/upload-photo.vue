<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input', $event)"
      :show-confirm-button="false"
    >
      <van-cell-group>
        <van-cell title="从相册选择" />
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
  }
}
</script>

<style>

</style>
