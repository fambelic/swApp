{{- define "matcher-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "matcher-service.namePrefix" -}}
{{- default "swapp" .Values.global.namePrefix -}}
{{- end -}}

{{- define "matcher-service.appName" -}}
{{- printf "%s-%s" (include "matcher-service.namePrefix" .) (default "matcher" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "matcher-service.fullname" -}}
{{- printf "%s-%s-%s" .Release.Name (include "matcher-service.namePrefix" .) (default "matcher" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "matcher-service.peerFullname" -}}
{{- $root := .root -}}
{{- $component := .component -}}
{{- printf "%s-%s-%s" $root.Release.Name (default "swapp" $root.Values.global.namePrefix) $component | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "matcher-service.labels" -}}
helm.sh/chart: {{ include "matcher-service.chart" . }}
app.kubernetes.io/name: {{ include "matcher-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: {{ default "matcher" .Values.componentName }}
app.kubernetes.io/part-of: {{ include "matcher-service.namePrefix" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "matcher-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "matcher-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
