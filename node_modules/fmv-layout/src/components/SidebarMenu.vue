<template>
  <div>
    <ul
      v-if="menu"
      :class="menuClass" 
      class="sidebar-menu">
      
      <template v-for="(item, itemIdx) in localMenu">
        <template v-if="item.children !== undefined && item.children.length">
          <li 
            :key="`smi-collapse-${itemIdx}`"
            :class="{ 'open': item.open }"
            class="sidebar-menu-item">
            <a 
              v-b-toggle="getId(item)"
              class="sidebar-menu-button"
              href="#"
              @click.prevent>
              <component
                v-if="!!item.icon"
                :is="item.icon.type"
                :class="{ 
                  'sidebar-menu-icon--left': item.icon.align === undefined || item.icon.align === 'left',
                  'sidebar-menu-icon--right': item.icon.align === 'right',
                }"
                class="sidebar-menu-icon"
                v-text="item.icon.id" />
              {{ item.label }}
              <span class="ml-auto sidebar-menu-toggle-icon" />
            </a>
            <b-collapse
              :id="getId(item)"
              v-model="item.open"
              class="sidebar-submenu sm-indent"
              tag="ul"
              @shown="emitState(getId(item), true)"
              @hidden="emitState(getId(item), false)">
              <li
                v-for="(child, idx) in item.children"
                :key="`smi-${idx}-${$store.state.locale}`"
                class="sidebar-menu-item"
                :class="{ 'active': child.active }">
                <component
                  :is="child.route ? linkComponent : 'a'"
                  v-bind="linkComponentProps(child)"
                  @click="onClick($event, child)"
                  class="sidebar-menu-button">
                  <span class="sidebar-menu-text">{{ child.label }}</span>
                </component>
              </li>
            </b-collapse>
          </li>
        </template>

        <li
          v-else
          :key="`smi-${itemIdx}-${$store.state.locale}`"
          class="sidebar-menu-item"
          :class="{ 'active': item.active }">
          <component
            :is="item.route ? linkComponent : 'a'"
            v-bind="linkComponentProps(item)"
            @click="onClick($event, item)"
            class="sidebar-menu-button">
            <component
              v-if="!!item.icon" 
              :is="item.icon.type" 
              class="sidebar-menu-icon sidebar-menu-icon--left"
              v-text="item.icon.id" />
            <span 
              class="sidebar-menu-text" 
              v-text="item.label" />
            <b-badge
              v-if="item.badge"
              :variant="item.badge.variant" 
              class="sidebar-menu-badge ml-auto"
              v-text="item.badge.label" />
          </component>
        </li>

      </template>
    </ul>
  </div>
</template>

<script>
import {isSameRoute, isIncludedRoute} from '~/utils/router'

const active = (ctx, item) => {
  try {
    const resolved = ctx.$router.resolve(item.route).resolved
    return item.exact
      ? isSameRoute(ctx.$route, resolved)
      : isIncludedRoute(ctx.$route, resolved)
  } catch(e) {
    console.error(`invalid route`, item)
  }
  return false
}

export default {
  name: 'FmvSidebarMenu',
  props: {
    menu: {
      type: Array,
      default() {
        return []
      }
    },
    menuClass: {
      type: [Array, String, Object],
      default: null
    },
    linkComponent: {
      type: [String, Object],
      default: () => 'b-link'
    },
    routeMatches: {
      type: Function,
      default: function (item) {
        let route

        try {
          item.children.map(child => {
            if (typeof child.route === 'string') {
              route = route || this.$route.name === child.route
              route = route || this.$route.path === child.route

              if (this.$i18n) {
                this.$i18n.locales.map(locale => {
                  const localeRoute = `${child.route}__${locale.code}`

                  route = route || this.$route.name === localeRoute
                  route = route || this.$route.path === localeRoute
                })
              }
            }
            
            route = route || this.$route.name === child.route.name
            route = route || this.$route.path === child.route.path
          })
        } catch(e) {}

        return route
      },
    }
  },
  data() {
    return {
      localMenu: []
    }
  },
  watch: {
    '$route': {
      deep: true,
      handler: 'setMenu'
    },
    '$root.$i18n.locale': 'setMenu'
  },
  created() {
    this.setMenu()
    this.$root.$on('fmv::sidebar-menu::reload', this.setMenu)
    this.$root.$on('bv::collapse::state', (collapseId, open) => {
      this.emitState(collapseId, false, open)
    })
  },
  beforeMount() {
    document.addEventListener('inertia:success', () => this.setMenu())
  },
  destroyed() {
    document.removeEventListener('inertia:success', () => this.setMenu())
  },
  methods: {
    linkComponentProps({ route, exact }) {
      return this.linkComponent === 'inertia-link'
        ? { href: route || '#' }
        : {
          to: route,
          exact
        }
    },
    setMenu() {
      try {
        this.localMenu = this.menu.map(item => {
          return {
            id: item.id,
            label: item.label,
            icon: !!item.icon ? {
              id: item.icon.id,
              type: item.icon.type,
            } : null,
            badge: !!item.badge ? {
              label: item.badge.label,
              variant: item.badge.variant,
            } : null,
            open: typeof item.open === 'function' ? item.open(this, item) : item.open,
            active: typeof item.active === 'function' 
              ? item.active(this, item) 
              : (this.$route && item.route ? active(this, item) : item.active),
            click: item.click,
            route: item.route,
            exact: item.exact,
            children: (item.children || []).map(item => {
              return {
                label: item.label,
                route: item.route,
                exact: item.exact,
                active: typeof item.active === 'function' 
                  ? item.active(this, item) 
                  : (this.$route && item.route ? active(this, item) : item.active),
                click: item.click,
              }
            })
          }
        })
        this.matchRoute()
      } catch(e) {
        console.warn(e, `
          Invalid sidebar menu structure. Valid example:
          [
            {
              id: <String> 'auth',
              label: <String> 'Auth',
              icon: <Object> {
                id: 'md-icon',
                type: 'tune',
              },
              badge: <Object> {
                label: 'Badge',
                variant: 'accent badge-notifications',
              },
              route: <String|Object>,
              exact: <Boolean> true,
              open: <Boolean|Function> (ctx, item) => {},
              active: <Boolean|Function> (ctx, item) => { item.route.indexOf('some-route') !== -1 },
              click: <Function> function(ctx, event, item) {},
              children: <Array> [
                {
                  label: <String> 'Sign up',
                  route: <String|Object> '/signup',
                  exact: <Boolean> true,
                  active: <Boolean|Function> (ctx, item) => { item.route.indexOf('signup') !== -1 },
                },
                {
                  label: <String> 'Logout',
                  click: <Function> (ctx, event, item) => {
                    event.preventDefault()
                    ctx.$root.$emit('logout')
                  }
                }
              ]
            }
          ]
        `)
      }
    },
    matchRoute() {
      this.$nextTick(() => {
        this.localMenu.map(item => {
          const open = this.routeMatches(item) || (item.children || []).find(item => item.active)
          this[
            open ? 'open' : 'close'
          ](item)
        })
      })
    },
    open(target) {
      if (target.open !== true) {
        const targetId = this.getId(target)
        this.$set(target, 'open', true)
        this.$emit('open', targetId)
        this.$root.$emit('bv::toggle::collapse', targetId)
      }
    },
    close(target) {
      this.$set(target, 'open', false)
      this.$emit('close', this.getId(target))
    },
    emitState(targetId, opened, open) {
      const state = {
        targetId,
        open,
        opened
      }
      this.$emit('state', state)
      this.$root.$emit('fmv::sidebar-menu::state', state)
    },
    getId(item) {
      return `sm${item.id}`
    },
    onClick(event, item) {
      if (item.click) {
        item.click(this, event, item)
      }
    }
  }
}
</script>
