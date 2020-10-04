+++
title = "휴고 Image Processing"
date = 2020-10-03T17:47:33+09:00
categories = ["what_is_hugo"]
tags = ["hugo","휴고","이미지 처리"]
banner = ""
draft = false
+++

이번 글은 휴고의 이미지 프로세싱에 관한 글입니다.

https://gohugo.io/content-management/image-processing/

## The Image Page Resource
`image`는 페이지 리소스이고 프로세싱 메소드는 `/static` 폴더 안에 있는 이미지에 대해서는 작동하지 않습니다.

페이지 번들의 모든 이미지 URL을 출력하는 예제

```html
{{ with .Resources.ByType "image" }}
{{ range . }}
{{ .RelPermalink }}
{{ end }}
{{ end }}
```

## The Image Resource

`image` 리소스는 글로벌 리소스에서도 가져올 수 있습니다.

```
{{-$image := resources.Get "images/logo.jpg"-}}
```

## Image Processing Methods
`image` 리소스는 특정 차원과 옵션을 통해 변환된 이미지를 반환하는 `Resize`,`Fit`그리고`Fill` 메소드를 사용합니다. `image` 리소스는 또한 휴고 0.58부터 `Exif`와 `Filter` 메소도 시행합니다.

### Resize
이미지의 width와 height를 재조정합니다. 

```
// Resize to a width of 600px and preserve ratio
{{ $image := $resource.Resize "600x" }}

// Resize to a height of 400px and preserve ratio
{{ $image := $resource.Resize "x400" }}

// Resize to a width 600px and a height of 400px
{{ $image := $resource.Resize "600x400" }}
```

### Fit
이미지 비율은 유지하면서 주어진 차원에 맞춰 이미지 스케일을 줄입니다. height값과 width값이 모두 필요합니다.
```
{{ $image := $resource.Fit "600x400" }}
```

### Fill
이미지를 주어진 차원에 맞춰 크기를 재조정하고 크롭합니다. height와 width 둘다 필요합니다.
```
{{ $image := $resource.Fill "600x400" }}
```
 
### Filter
하나 이상의 필터를 이미지에 입힙니다.
사용 가능한 필터 목록은 아래 링크를 참조 하십시오.

https://gohugo.io/functions/images/#image-filters

```
{{ $img = $img.Filter (images.GaussianBlur 6) (images.Pixelate 8) }}
```

위 예제는 파이프라인을 통해 다르게 쓰일 수 있습니다.

```
{{ $img = $img | images.Filter (images.GaussianBlur 6) (images.Pixelate 8) }}
```

필터는 주어진 순서대로 입혀집니다. 이는 때때로 쓸만한 필터 체인을 만들고 재사용이 용이하게 합니다.

```
{{ $filters := slice  (images.GaussianBlur 6) (images.Pixelate 8) }}
{{ $img1 = $img1.Filter $filters }}
{{ $img2 = $img2.Filter $filters }}
```

### Exif
주어진 이미지에 대한 메타데이터의 Exif 객체를 제공합니다. 이는 JPEG, TIFF 이미지에만 적용된다는 것을 주의하십시오. 따라서 우리는 `with` 으로 리소스를 감싸는것을 추천드립니다.

```
{{ with $img.Exif }}
Date: {{ .Date }}
Lat/Long: {{ .Lat}}/{{ .Long }}
Tags:
{{ range $k, $v := .Tags }}
TAG: {{ $k }}: {{ $v }}
{{ end }}
{{ end }}
```

아니면 개별적으로 `.`을 통해 접근하십시오.

```
{{ with $src.Exif }}
  <ul>
      {{ with .Date }}<li>Date: {{ .Format "January 02, 2006" }}</li>{{ end }}
      {{ with .Tags.ApertureValue }}<li>Aperture: {{ lang.NumFmt 2 . }}</li>{{ end }}
      {{ with .Tags.BrightnessValue }}<li>Brightness: {{ lang.NumFmt 2 . }}</li>{{ end }}
      {{ with .Tags.ExposureTime }}<li>Exposure Time: {{ . }}</li>{{ end }}
      {{ with .Tags.FNumber }}<li>F Number: {{ . }}</li>{{ end }}
      {{ with .Tags.FocalLength }}<li>Focal Length: {{ . }}</li>{{ end }}
      {{ with .Tags.ISOSpeedRatings }}<li>ISO Speed Ratings: {{ . }}</li>{{ end }}
      {{ with .Tags.LensModel }}<li>Lens Model: {{ . }}</li>{{ end }}
  </ul>
{{ end }}
```

몇몇 field는 아마 `lang.NumFmt` 함수를 통해 `Aperture: 2.278934289` 같은 형식 대신 `Aperture: 2.28` 형식으로 보이게 포멧해야할 것입니다.

#### Exif fileds
**Date**  
사진이 찍힌 날짜/시간 입니다.

**Lat**  
사진이 찍힌 장소의 latitude 입니다.

**Long**  
사진이 찍힌 장소의 longtitude 입니다.

설정에서 Exif에 무엇이 담길지 설정할 수 있습니다.image processing 설정은 맨 아래서 다루겠습니다.

## Image Processing Options
이미지를 변형하기위해 주어지는 차원에(600x400 같은 공간을 말함) 추가적인 옵션을 줄 수 있습니다.

### Background Color
이 옵션은 투명한 레이어에 색을 채웁니다. 이 옵션은 `JPEG`같이 투명한 배경 기능을 제공하지 않는 포멧을 변환할 때 유용합니다.

배경 색은 3자리 또는 6자리의 `#`으로 시작하는 hex code로 입력할 수 있습니다.
```
{{ $image.Resize "600x jpg #b31280" }}
```

또한 설정에서 기본 배경색을 지정해 줄 수 있습니다.

### JPEG Quality
JPEG 이미지들에 한해, 1~100사이의값을 주어 화질을 조절할 수 있습니다. 기본값은 75 입니다.
```
{{ $image.Resize "600x q50" }}
```

### Rotate
이미지를 주어진 각도에 맞게 시계방향으로 돌립니다.

```
{{ $image.Resize "600x r90" }}
```

### Anchor
`Fill` 메소드에서만 작동합니다. 이 메소드는 썸네일을 생성할 때 이미지의 중요한 부분이 한쪽으로 몰려있는 경우 유용합니다. (예를 들어 사진의 왼쪽에 사람 얼굴이 있는 경우 썸네일에 왼쪽의 사람 얼굴을 크롭해서 쓰고싶을 때)

사용 가능한 값은 `Smart`,`Center`,`TopLeft`,`Top`,`TopRight`,`Left`,`Right`,`BottomLeft`,`Bottom`,`BottomRight` 가 있습니다.

기본값은 Smart이고 Smartcrop을 사용해 최적의 crop을 결정합니다. 

```
{{ $image.Fill "300x200 BottomLeft" }}
```

Smartcrop이 어떤것인지 알고싶다면 아래 링크로
https://github.com/muesli/smartcrop

### Resample Filter
resizing에 사용되는 필터입니다. 기본값은 `Box` 입니다. `Box`는 쉽고 빠르게 downscaling을 적용하는데 사용되는 resampling 필터입니다.
`Box`,`NearestNeightbor`,`Linear`,`Gaussian` 등의 값이 사용가능합니다.

더 많이 알아보려면 다음 링크를 참조하십시오 
https://github.com/disintegration/imaging

```
{{ $image.Resize "600x400 Gaussian" }}
```

### Target Format
기본적으로 이미지는 리소스 형식에 맞춰 인코딩 됩니다. 그러나 이미지의 형식을 옵션으로 바꿔줄 수 있습니다.
가능한 값은 `jpg`,`png`,`tif`,`bmp`,`gif` 입니다.

```
{{ $image.Resize "600x jpg" }}
```

## Image Processing Examples
아래 코드는 쓸만한 이미지 프로세싱 shortcode 입니다.  
'layouts/shortcodes/imgproc.html'
```html
{{ $original := .Page.Resources.GetMatch (printf "*%s*" (.Get 0)) }}
{{ $command := .Get 1 }}
{{ $options := .Get 2 }}
{{ if eq $command "Fit"}}
{{ .Scratch.Set "image" ($original.Fit $options) }}
{{ else if eq $command "Resize"}}
{{ .Scratch.Set "image" ($original.Resize $options) }}
{{ else if eq $command "Fill"}}
{{ .Scratch.Set "image" ($original.Fill $options) }}
{{ else }}
{{ errorf "Invalid image processing command: Must be one of Fit, Fill or Resize."}}
{{ end }}
{{ $image := .Scratch.Get "image" }}
<figure style="padding: 0.25rem; margin: 2rem 0; background-color: #cccc">
	<img style="max-width: 100%; width: auto; height: auto;" src="{{ $image.RelPermalink }}" width="{{ $image.Width }}" height="{{ $image.Height }}">
	<figcaption>
	<small>
	{{ with .Inner }}
	{{ . }}
	{{ else }}
	.{{ $command }} "{{ $options }}"
	{{ end }}
	</small>
	</figcaption>
</figure>  
```

다음과 같이 사용합니다.
```
{ {< imgproc sunset Resize "300x" />} }
```

## Image Processing Config

`config` 파일에서 imaging 부분을 통해 이미지 프로세싱 옵션을 설정해줄 수 있습니다.

```toml
[imaging]
# Default resample filter used for resizing. Default is Box,
# a simple and fast averaging filter appropriate for downscaling.
# See https://github.com/disintegration/imaging
resampleFilter = "box"

# Default JPEG quality setting. Default is 75.
quality = 75

# Anchor used when cropping pictures.
# Default is "smart" which does Smart Cropping, using https://github.com/muesli/smartcrop
# Smart Cropping is content aware and tries to find the best crop for each image.
# Valid values are Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
anchor = "smart"

# Default background color.
# Hugo will preserve transparency for target formats that supports it,
# but will fall back to this color for JPEG.
# Expects a standard HEX color string with 3 or 6 digits.
# See https://www.google.com/search?q=color+picker
bgColor = "#ffffff"

[imaging.exif]
 # Regexp matching the fields you want to Exclude from the (massive) set of Exif info
# available. As we cache this info to disk, this is for performance and
# disk space reasons more than anything.
# If you want it all, put ".*" in this config setting.
# Note that if neither this or ExcludeFields is set, Hugo will return a small
# default set.
includeFields = ""

# Regexp matching the Exif fields you want to exclude. This may be easier to use
# than IncludeFields above, depending on what you want.
excludeFields = ""

# Hugo extracts the "photo taken" date/time into .Date by default.
# Set this to true to turn it off.
disableDate = false

# Hugo extracts the "photo taken where" (GPS latitude and longitude) into
# .Long and .Lat. Set this to true to turn it off.
disableLatLong = false

```

## Image Processing Performance Consideration
처리된 이미지들은 `<project-dir>/resources` 위치에 저장됩니다. 이 폴더는 빠르게 이미지를 가져오는데 사용됩니다. (즉, 캐쉬 이미지) 한번 생성되면 재사용됩니다. 만약 이미지 세팅이 바뀌면 이미지를 지우거나 이름을 바꾸는등 이미지를 재활용 해야합니다. 캐시 이미지를 지우려면 다음과같이 입력하시면됩니다.

```bash
hugo --gc
``` 