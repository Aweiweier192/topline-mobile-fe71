<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input', $event)"
      :show-confirm-button="false"
    >
      <van-cell-group>
        <van-cell title="从相册选择" @click="handleShowFileSelect" />
        <input
          style="display: none;"
          ref="file"
          type="file"
          @change="handleFileChange"
        >
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {}
  },

  computed: {
    file () {
      return this.$refs['file']
    }
  },

  methods: {
    handleShowFileSelect () {
      this.file.click()
    },

    handleFileChange () {
      const reader = new FileReader()
      reader.readAsDataURL(this.file.files[0])
      reader.onload = () => {
        ImagePreview({
          images: [
            reader.result // base64 编码的图片文件
          ],
          showIndex: false // 是否显示页码
        })
      }

      // ImagePreview({
      //   images: [
      //     // 这种方式有个问题。不建议使用
      //     // window.URL.createObjectURL(this.file.files[0])
      //   ],
      //   showIndex: false // 是否显示页码
      // })
    }
  }
}
</script>

<style>

</style>
