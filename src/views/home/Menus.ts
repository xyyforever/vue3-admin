export const Menus = [
    {
        id: 1,
        firstTitle: '商户',
        child: [{
            icon: 'el-icon-office-building',
            secondTitle: '商户管理',
            child: [{
                thirdTitle: '商户列表',
                url: '/merchantList'
            }]
        }]
    },
    {
        id: 2,
        firstTitle: '订单',
        child: [{
            icon: '',
            secondTitle: '订单管理',
            child: [{
                thirdTitle: '订单列表',
                url: '/orderList'
            }]
        }]
    },
    {
        id: 3,
        firstTitle: '报告',
        child: [{
            icon: '',
            secondTitle: '报告管理',
            child: [{
                thirdTitle: '报告列表',
                url: '/reportList'
            }]
        }]
    },
    {
        id: 4,
        firstTitle: '客户',
        child: [{
            icon: '',
            secondTitle: '客户管理',
            child: [{
                thirdTitle: '客户列表',
                url: '/customerList'
            }]
        }]
    },
    {
        id: 5,
        firstTitle: '营销',
        child: [{
            icon: '',
            secondTitle: '营销管理',
            child: [{
                thirdTitle: '营销列表',
                url: '/marketingList'
            }]
        }]
    },
    {
        id: 6,
        firstTitle: '财务',
        child: [{
            icon: '',
            secondTitle: '财务管理',
            child: [{
                thirdTitle: '财务列表',
                url: '/financeList'
            }]
        }]
    },
    {
        id: 7,
        firstTitle: '报表',
        child: [{
            icon: '',
            secondTitle: '报表管理',
            child: [{
                thirdTitle: '报表列表',
                url: '/reportFormList'
            }]
        }]
    },
    {
        id: 8,
        firstTitle: '系统',
        child: [{
            icon: '',
            secondTitle: '系统管理',
            child: [{
                thirdTitle: '系统列表',
                url: '/systemList'
            }]
        }]
    }
]


// 获取侧边栏二级菜单
export const getSecondMenus: any = (firstTitle: string) => {
    const menu:any = Menus.find(item => item.firstTitle === firstTitle)
    return menu.child
}
// 获取侧边栏三级菜单
export const getThirdMenus: any = (firstTitle: string, secondTitle: string) => {
    const menu:any = getSecondMenus(firstTitle)
    const secondMenu = menu.find((item:any) => item.secondTitle === secondTitle)
    return secondMenu.child
}

export const getCurrentMenuTitle: any = (path: string) => {
    let menu = {
        firstTitle: '',
        secondTitle: '',
        thirdTitle: '',
        thirdPath: ''
    }
    Menus.forEach(a => {
        a.child.forEach(b => {
            b.child.forEach((c: any) => {
                if (c.url === path) {
                    menu.firstTitle = a.firstTitle
                    menu.secondTitle = b.secondTitle
                    menu.thirdTitle = c.thirdTitle
                    menu.thirdPath = c.url
                }
            })
        })
    })
    return menu
}