<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input', $event)"
      :show-confirm-button="false"
    >
      <van-cell-group>
        <van-cell title="从相册选择" @click="file.click()" />
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
import { updateUserProfileImage } from '@/api/user'

export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      previewImage: null
    }
  },

  computed: {
    file () {
      return this.$refs['file']
    }
  },

  methods: {
    handleFileChange () {
      const reader = new FileReader()
      reader.readAsDataURL(this.file.files[0])
      reader.onload = () => {
        this.previewImage = ImagePreview({
          images: [
            reader.result // base64 编码的图片文件
          ],
          showIndex: false, // 是否显示页码
          onClose: this.handlePreviewImageClose,
          asyncClose: true
        })
      }

      // ImagePreview({
      //   images: [
      //     // 这种方式有个问题。不建议使用
      //     // window.URL.createObjectURL(this.file.files[0])
      //   ],
      //   showIndex: false // 是否显示页码
      // })
    },

    handlePreviewImageClose () {
      this.$dialog.confirm({
        message: '是否设置该图片为头像'
      }).then(() => {
        // 关闭图片预览
        this.previewImage.close()

        // 关闭选择图片对话框
        this.$emit('input', false)

        // 请求上传
        this.uploadPhoto()
      }).catch(() => {
      })
    },

    async uploadPhoto () {
      try {
        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '头像上传中'
        })
        const data = await updateUserProfileImage('photo', this.file.files[0])
        this.$toast.success('更新头像成功')
        this.$emit('upload-success', data.photo)

        // 清除 loading
        toast.clear()
      } catch (err) {
        this.$toast.fail('更新头像失败')
      }
    }
  }
}
</script>

<style>

</style>
